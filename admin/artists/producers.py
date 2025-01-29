from confluent_kafka import Producer
import json


def request_artists():
    producer = Producer({'bootstrap.servers': 'localhost:9092'})  
    message = {'action': 'fetch_artists'}
    
    try:
        producer.produce('artists_request', value=json.dumps(message).encode('utf-8'))
        producer.flush()  
        print(f"Message sent: {message}")
    except Exception as e:
        print(f"Error sending message: {e}")


def request_verify_artist(data):
    producer = Producer({'bootstrap.servers': 'localhost:9092'})
    message = {'action': 'verify_artist', 'data': data}

    try:
        producer.produce('artists_request', value=json.dumps(message).encode('utf-8'))
        producer.flush()
        print(f"Message sent: {message}")
    except Exception as e:
        print(f"Error sending message: {e}")

