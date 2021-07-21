import pika, json

params = pika.URLParameters('amqps://eyoyxgei:T8RH5h9vlTuUOo_mDYjCT-2BCcmqIavc@elk.rmq2.cloudamqp.com/eyoyxgei')
connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='admin', body=json.dumps(body),
                          properties=properties)
