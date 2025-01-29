from confluent_kafka import Consumer
import json

def artists_response():
    consumer = Consumer({
        'bootstrap.servers': 'localhost:9092',
        'group.id': 'admin_service',
        'auto.offset.reset': 'earliest'
    })
    consumer.subscribe(['artists_response'])

    try:
        while True:
            message = consumer.poll(1.0)
            if message is None:
                continue
            elif message.error():
                print(f"Consumer error: {message.error()}")
                continue

            try:
                response = json.loads(message.value().decode('utf-8'))
            except json.JSONDecodeError as e:
                print(f"JSON decoding error: {e}")

            match response.get('response'):

                case 'fetch_artists_response':
                    data = response.get('data', [])
                    print(f"Artists received: {data}")
                    break
            
                case 'verify_artist_response':
                    data = response.get('data', False)
                    print(f"Artist verified: {data}")
                    break

    except KeyboardInterrupt:
        print("Consumer interrupted.")
    finally:
        consumer.close()
    
    return data