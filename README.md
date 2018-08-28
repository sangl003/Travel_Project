uExplore is an application designed to assist tourists in finding the nearest amenities, services, and attractions to their current, and most likely unfamiliar, location. While it was created with the intention of assisting those new to an area, it also proves useful to locals and anyone else looking to learn more about the area surrounding the grounds they stand on.

In its current state, uExplore features an interactive map that pulls the user’s current location (upon user approval) and displays nearby places-of-interest to the user. Preloaded categories of “Cafe”, “Store”, “Restaurant”, “Bar”, and “Bank” exist alongside the user’s capability to search and customize five additional categories to best suit their personal interests. Simplifying and limiting the search results to one category at a time allows users to select specific, narrowed-down categories to create a simple, easy to view UI.



Place Types
This page lists the supported values for the types property in the Places API. Table 1 lists the types you can use in place searches and place additions. Table 2 lists the additional types that may be returned in the place search results. Table 3 lists the types you can use in place autocomplete requests. Table 4 lists deprecated types that are no longer supported.

Table 1: Types supported in place search and addition
You can use the following values in the types filter for place searches and when adding a place.

accounting
airport
amusement_park
aquarium
art_gallery
atm
bakery
bank
bar
beauty_salon
bicycle_store
book_store
bowling_alley
bus_station
cafe
campground
car_dealer
car_rental
car_repair
car_wash
casino
cemetery
church
city_hall
clothing_store
convenience_store
courthouse
dentist
department_store
doctor
electrician
electronics_store
embassy
fire_station
florist
funeral_home
furniture_store
gas_station
gym
hair_care
hardware_store
hindu_temple
home_goods_store
hospital
insurance_agency
jewelry_store
laundry
lawyer
library
liquor_store
local_government_office
locksmith
lodging
meal_delivery
meal_takeaway
mosque
movie_rental
movie_theater
moving_company
museum
night_club
painter
park
parking
pet_store
pharmacy
physiotherapist
plumber
police
post_office
real_estate_agency
restaurant
roofing_contractor
rv_park
school
shoe_store
shopping_mall
spa
stadium
storage
store
subway_station
supermarket
synagogue
taxi_stand
train_station
transit_station
travel_agency
veterinary_care
zoo

Table 2: Additional types returned by the Places service
The following types may be returned in the results of a place search, in addition to the types in table 1 above. For more details on these types, refer to Address Types in Geocoding Responses

Note: The types below are not supported in the type filter of a place search, or in the types property when adding a place.
administrative_area_level_1
administrative_area_level_2
administrative_area_level_3
administrative_area_level_4
administrative_area_level_5
colloquial_area
country
establishment
finance
floor
food
general_contractor
geocode
health
intersection
locality
natural_feature
neighborhood
place_of_worship
political
point_of_interest
post_box
postal_code
postal_code_prefix
postal_code_suffix
postal_town
premise
room
route
street_address
street_number
sublocality
sublocality_level_4
sublocality_level_5
sublocality_level_3
sublocality_level_2
sublocality_level_1
subpremise

Table 3: Types supported in place autocomplete requests
You may restrict results from a Place Autocomplete request to be of a certain type by passing a types parameter. The parameter specifies a type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned. In general only a single type is allowed. The exception is that you can safely mix the geocode and establishment types, but note that this will have the same effect as specifying no types. The supported types are:

geocode instructs the Place Autocomplete service to return only geocoding results, rather than business results. Generally, you use this request to disambiguate results where the location specified may be indeterminate.
address instructs the Place Autocomplete service to return only geocoding results with a precise address. Generally, you use this request when you know the user will be looking for a fully specified address.
establishment instructs the Place Autocomplete service to return only business results.
The (regions) type collection instructs the Places service to return any result matching the following types:
locality
sublocality
postal_code
country
administrative_area_level_1
administrative_area_level_2
The (cities) type collection instructs the Places service to return results that match locality or administrative_area_level_3.
Table 4: Deprecated types
The following types have been deprecated and are no longer supported. If you are using one of these types, consult Table 1 to find a suitable alternative.
establishment
finance
food
general_contractor
grocery_or_supermarket
health
place_of_worship
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 3.0 License, and code samples are licensed under the Apache 2.0 License. For details, see our Site Policies. Java is a registered trademark of Oracle and/or its affiliates.
