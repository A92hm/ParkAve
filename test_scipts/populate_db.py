from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from random import choice
from faker import Factory


fake = Factory.create()
# client = MongoClient('mongodb://54.84.154.254')
client = MongoClient('mongodb://localhost')
db = client.parking
db_users = db.User
db_lots = db.Lot
db_spots = db.Spot
db_cars = db.Car
db_reviews = db.Review


def makeUser(n):
	users = []
	for i in xrange(0, n):
		user = {
			'first_name': fake.first_name(),
			'last_name': fake.last_name(),
			'email': fake.free_email(),
			'password': '$2a$10$r88KhLXgoIIZcvtXAJjsG.3mACfSkOkuRv1TynF0fmrTn5c7ThTpS', #soba
			'birthdate': fake.date(pattern="%m-%d-%y"),
			'phone': fake.phone_number()
		}
		user_id = db_users.insert(user)
		print 'Added user: ', user_id
		users.append(user)
	return users

def makeLot(n):
	# Querying the users
	users = [user for user in db_users.find()]

	lots = []
	for i in xrange(0, n):
		lot = {
			'user_id' : choice(users)['_id'],
			'title' : fake.word(),
			'address' : {
			 	'address1': fake.street_name(),
				'address2': fake.building_number(),
			 	'city': fake.city(),
			 	'state': fake.state(),
				'zip': fake.postcode()
			},
			'lat': float(fake.latitude()),
			'lng': float(fake.longitude())
		}
		lot_id = db_lots.insert(lot)
		print 'Added lot: ', lot_id
		lots.append(lot)
	return lots

def makeSpot(n):
	# Querying the lots
	lots = [lot for lot in db_lots.find()]

	spots = []
	for i in xrange(0, n):
		lot = choice(lots)
		spot = {
			'title' : fake.word(),
			'date' : fake.date(pattern="%m-%d-%y"),
			'buyer_list' : [],
			'numSpots' :  fake.random_int(min=1, max=10),
			'event_id' : '',
			'size' : choice(['Sedan', 'Truck', 'SUV', 'Minivan', 'Van', 'Compact']),
			'surface' : choice(['Grass', 'Gravel', 'Dirt', 'Pavement']),
			'blocked' : fake.boolean(chance_of_getting_true=50),
			'price': choice([10,15,20,25,30]),
			'user_id' : lot['_id'] ,
			'lot_id' : lot['user_id']
		}
		spot_id = db_spots.insert(spot)
		print 'Added spot: ', spot_id
		spots.append(spots)
	return spots

def makeVehicle(n):
	# Querying the users
	users = [user for user in db_users.find()]

	vehicles = []
	for i in xrange(0,n):
		vehicle = {
			'make' : choice(['BMW','Honda','Toyota','Kia','Nissan','Hyundai', 'Jeep','Ford','Chevrolet']),
			'model': fake.word(),
			'year' : fake.date(pattern="%y"),
			'color': fake.word(),
			'type' : choice(['Sedan', 'Truck', 'SUV', 'Minivan', 'Van', 'Compact']),
			'license' : fake.bothify(text="???###"),
			'state' : fake.state(),
			'user_id': choice(users)['_id']
		}
		vehicle_id = db_cars.insert(vehicle)
		print 'Added vehicle: ', vehicle_id
		vehicles.append(vehicle)
	return vehicles

def makeReviews(n):
	# Querying the users
	users = [user for user in db_users.find()]

	reviews = []
	for i in xrange(0,n):
		review = {
			'title': fake.word(),
			'date': fake.date(pattern="%m-%d-%y"),
			'stars': fake.random_int(min=1, max=5),
			'reviewer_id': choice(users)['_id'],
			'reviewee_id': choice(users)['_id'],
			'body':fake.text(max_nb_chars=400)
		}
		review_id = db_reviews.insert(review)
		print 'Added review: ', review_id
		reviews.append(review)
	return reviews

def main():
	# makeUser(10)
	# makeLot(10)
	# makeSpot(20)
	# makeVehicle(10)
	# makeReviews(50)


if __name__ == '__main__':
	main()
