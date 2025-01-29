import json
from confluent_kafka import Consumer, Producer
from accounts.models import Artists
from accounts.serializers import ArtistSerializer

def artists_request():
    
    consumer = Consumer({
        'bootstrap.servers': 'localhost:9092',
        'group.id': 'artists_service',
        'auto.offset.reset': 'earliest'
    })

    
    consumer.subscribe(['artists_request'])

    
    producer = Producer({'bootstrap.servers': 'localhost:9092'})

    try:
        while True:
            
            message = consumer.poll(1.0)
            if message is None:
                continue  
            if message.error():
                print(f"Consumer error: {message.error()}")
                continue

            
            try:
                message_value = message.value().decode('utf-8')
                request = json.loads(message_value)
            except json.JSONDecodeError as e:
                print(f"JSON decoding error: {e}")
                continue

            match request.get('action'):
                case 'fetch_artists':
                
                    artists = Artists.objects.all()
                    serializer = ArtistSerializer(artists, many=True)
                    
                    response = {'response': 'fetch_artists_response', 'data': serializer.data}

                    
                    try:
                        producer.produce('artists_response', value=json.dumps(response).encode('utf-8'))
                        producer.flush()  
                        print(f"Response sent: {response}")
    
                    except Exception as e:
                        print(f"Error producing message: {e}")

                case 'verify_artist':
                
                    try:
                        email = request.get('data')
                        artist = Artists.objects.get(email=email)
                        artist.verified = True
                        artist.save()

                        artists = Artists.objects.all()
                        serializer = ArtistSerializer(artists, many=True)
                    
                        response = {'response': 'verify_artist_response', 'data': serializer.data}

                    
                        try:
                            producer.produce('artists_response', value=json.dumps(response).encode('utf-8'))
                            producer.flush()  
                            print(f"Response sent: {response}")
        
                        except Exception as e:
                            print(f"Error producing message: {e}")
                
                    except Artists.DoesNotExist:
                        print(f"Artist with email {email} does not exist")
            

    except KeyboardInterrupt:
        print("Service interrupted by user.")
    finally:
        
        consumer.close()

