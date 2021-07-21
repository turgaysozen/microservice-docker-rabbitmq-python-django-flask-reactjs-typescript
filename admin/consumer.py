import pika,json, os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")
django.setup()

from products.models import Product

params = pika.URLParameters('amqps://eyoyxgei:T8RH5h9vlTuUOo_mDYjCT-2BCcmqIavc@elk.rmq2.cloudamqp.com/eyoyxgei')
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='admin')


def callback(ch, method, properties, body):
    print('received in admin')
    product_id = json.loads(body)
    print(product_id)
    product = Product.objects.get(id=product_id)
    print(product)
    product.likes = product.likes + 1
    product.save()
    print('Product likes increased')
    print(body)


channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)
print('Started consuming')
channel.start_consuming()
channel.close()
