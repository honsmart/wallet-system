export const  docs = `Wallet API documentation <br> 
                 <h2>Authentication<h2>
                 <h3>Generic access token</h3>
                 <p>Authenticate your API calls by including your token in the Authorization header of every request you make</p>
                 <p>You will use this token in your request's Authorization header. Here is an example:<br><br><br><code> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGhvbmVOdW1iZXIiOjIzNDkwMDAwMDAwMDAsImlhdCI6MTY2NTYyNDcxNywiZXhwIjoxNjY1NjI1NjE3fQ.ydQrT-l7JlMvImV29_uaWKNkUs4vm8yZbhxcazq1Ggg </code></p>
                 <h3>Acess and Refresh Token</h3>
                 <p>To aquire access token for wallet service:</p>
                 <p>1.Login via Auth route </a> or Register through the register route. </p>
                 <p>Note: Access token and Refresh token is generated after user is Authenticated or Registered </p>
                 <h2>Requests and Response</h2>
                 <p>Both request body data and response data are formatted as JSON. Content type for responses will always be application/json. Generally, all responses will be in the following format:</p>
                 <code>
                 <p>Error:</p>
                 {
                    "statusCode": [string], <br> 
                    "message": [string], <br>
                  }<br><br>
                  <p>Transaction result:</p>
                  {
                    "id": "4",<br> 
                    "currency": "EURO",<br> 
                    "sender_wallet_id": "298102388238",<br> 
                    "receiver_wallet_id": "298102388238",<br> 
                    "historyFor": "Sender",<br> 
                    "amount": "100",<br> 
                    "transactionType": "DEBIT",<br> 
                    "status": "UnApproved",<br> 
                    "adminApproval": false,<br> 
                    "completed": false,<br> 
                    "createdAt": "2022-10-13T00:11:06.530Z",<br> 
                    "updatedAt": "2022-10-13T00:11:06.530Z"<br> 
                  }
                  </code>
                  <h2>Response Codes </h2>
                  <p>200, 201: Request was successful and intended action was carried out.<p>
                  <p>400: A validation or client side error occurred and the request was not fulfilled.<p>
                  <p>401: The request was not authorized. This can be triggered by passing an invalid token in the authorization header or the lack of one.<p>
                  <p>404: Request could not be fulfilled as the request resource does not exist.<p>
                  <p>500, 501, 502, 503, 504: Request could not be fulfilled due to an error on wallet service end.<p>
                 <h2>How it works<h2>
                 <h4>Account</h4>
                 <p>1. POST /accounts/register is the registration route for creating users</p>
                 <p>2. POST /accounts/auth is the login route which is responsible for authentication and access and refresh token generator</p>
                 <p>3. POST /accounts/logout is the route that is responsible for loging out user and also disactivate refresh token and access token</p>
                 <p>4. POST /accounts/refresh is the route that is responsible for generating new refresh token to access protected routes. You need to provide refresh token in request's Authorization header to have access to the route</p>
                 <h4>Wallet</h4>
                 <p>The route listed below need Access token in request's Authorization header inorder to be granted access.</p>
                 <p>1. POST /wallet/create is the wallet creating route for creating unique wallet id with leading 298, diffrent currency.</p>
                 <p>2. POST /wallet/transfer is the transfer route which is responsible for transfering amount from one wallet to another.</p>
                 <p>3. POST /accounts/logout is the route that is responsible for loging out user and also disactivate refresh token and access token.</p>
                 <h4>Admin</h4>
                 <p>The route listed below need Access token in request's Authorization header inorder to be granted access, and the routes listed below can only be access by Admin user</p>
                 <p>1. GET admin/unapprovedtransactions is the route that return transaction amount over N1,000,000 which must be approved my Admin and also the transaction status is UNAPPROVED by default.</p>
                 <p>2. POST /admin/approvetransaction is the route which is responsible for approving transaction amount over N1,000,000.</p><br>
                <h2>ADMIN CREDENTIALS</h2>
                 <p>Phone Number: 2349000000000</p>
                 <p>Password: 12345</p>
                 <h1>WALLET SERVICE</h1>
                 <p>A user can create an account and also authenticate with a unique phone number and password.</p>
                 <p>A user can create many wallet each with a unique currency and unique wallet ID will be generated.</p>
                 <p>A user can credit and transfer from one wallet to another.</p>
                 <p>Wallet transfer over N1,000,000 will be approved by ADMIN user</p>
                 `

  