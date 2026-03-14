## To Go Trip Planner
This is a full stack web application that allows the user to plan a trip itinerary using Google Maps API to visualize the locations of different trip activities and destinations. This will allow users to see locations of each itinerary item in relation to eachother, making it easier to plan optimal routes. To create a trip, the user must create a trip name (ie "Summer Vacation in Hawaii!"), the location of the trip (ie Hawaii"), and the start and end date of the trip. Based on this information, a trip page will be created displaying a map of the trip location, and the itinerary.

# Tool stack
This is a Next.js project using React and Typescript, Firestore, and Vercel.

APIs used are as follows:
- Google Maps Platform Geocoding API
- Google Maps Platform Maps Embed API
- Google Maps Platform Maps JavaScript API
- Google Maps Platform Places API (New)
- Google Identity OAuth 2.0

# Running the Project
To run the project, first create a *.env* file with API keys for the APIs mentioned above and Firestore using the following API key names:
NEXT_PUBLIC_GOOGLE_MAPS_KEY
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

It is also necessary to create a Google Map ID: https://developers.google.com/maps/documentation/javascript/map-ids/get-map-id.

# Acknowledgements
Arthur Lee Van Der Harst: Front-end developer
Phohanh Tran: Front-end developer
Yousuf Al-Bassyiouni: Back-end developer
