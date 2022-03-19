# WatIamLOST

## Contributing

1. Ask one of the collaborators to add your IP address to the list of whitelisted IPs for the MongoDB instance.

2. Register for an [UWaterloo API Key](https://openapi.data.uwaterloo.ca/api-docs/index.html). In particular:
  - Fill out the fields in `/v3/Account/Register`.
  - An email will be sent to the address specified in the form with an activation code and your API key.
  - Copy the activation code and fill in the corresponding fields in `/v3/Account/Confirm`.
  - Your API key will now be activated.

3. Clone the git repository.

4. Place the following environment variables in `server/.env`:
```
DB_CONNECT
TOKEN_SECRET
CLASS_URI
WATERLOO_API_KEY
```

5. Build and start the server:
```bash
cd server
npm install
npm run build
npm start
```

6. Start the client:
```bash
cd client
npm install
npm start
```

## Links
- [Server API Documentation](server/README.md)
