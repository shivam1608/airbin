# Airbin 🌪
A simple http key value db service over airtable database for easy access of key value pairs just like jsonbin, made and deployed with deno. Trying Deno for the first time.

Now you don't need to signup for any free tier or buy any costly storage `login` directly with github and start building. Each user get a base and we call it `Airbase`.


### Live On 🟢
[https://airbin.deno.dev/](https://airbin.deno.dev/)

#### Login to get started
[https://airbin.deno.dev/_/login](https://airbin.deno.dev/_/login)

#### Airbin can be deployed on own as `ONLY_SELF_HOSTED` for personal easy data storage


## API Documentation 📘
- The rest api is very simple to use but has some limitations

#### Limitations
- Each user only get 1200 keys. 
- Each request has a soft limit of 4 MiB data.
- So technically you get nearly 4 GiB storage which is good for small projects


### - **GET** 
` https://airbin.deno.dev/:USER_ID/:KEY `

This request gets the value without token if data is set to public else token is required and returns `null` if no data is present at that space.

#### Headers 📃
<table>
<thead>
  <tr>
    <th>Header</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Authorization</td>
    <td><code>Bearer :TOKEN</code><br>The token can be obtained after <code>/_/login</code>.</td>
  </tr>
</tbody>
</table>

#### OPTIONS ⚙
<table>
<thead>
  <tr>
    <th>Query</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>USER_ID</td>
    <td>REQUIRED</td>
    <td>The airbase userid. can be obtained from <code>/_/me</code> after <code>/_/login</code>.</td>
  </tr>
  <tr>
    <td>KEY</td>
    <td>REQUIRED</td>
    <td>The key where the value is saved.</td>
  </tr>
</tbody>
</table>


### - **POST** 
` https://airbin.deno.dev/:USER_ID/:KEY `

This request puts the value in the `:KEY` and if key already has a value it overwrites the value.

#### Headers 📃
<table>
<thead>
  <tr>
    <th>Header</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Authorization</td>
    <td><code>Bearer :TOKEN</code><br>The token can be obtained after <code>/_/login</code>.</td>
  </tr>
</tbody>
</table>

#### OPTIONS ⚙
<table>
<thead>
  <tr>
    <th>Body</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Body</td>
    <td>REQUIRED</td>
    <td>Body should be the value to store can be plain or json (prefer json).</td>
  </tr>
</tbody>
</table>


### - **PATCH** 
` https://airbin.deno.dev/:USER_ID/:KEY `

This request can alter the `data access` to be pulbic or private(can be accessed without a token or not).

#### Headers 📃
<table>
<thead>
  <tr>
    <th>Header</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Authorization</td>
    <td><code>Bearer :TOKEN</code><br>The token can be obtained after <code>/_/login</code>.</td>
  </tr>
</tbody>
</table>

#### OPTIONS ⚙
<table>
<thead>
  <tr>
    <th>Body (JSON)</th>
    <th>Required?</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>public</td>
    <td>REQUIRED</td>
    <td><code>true</code>or <code>false</code>.</td>
  </tr>
</tbody>
</table>



### - **DELETE** 
` https://airbin.deno.dev/:USER_ID/:KEY `

This request deletes the `:KEY` from the airbase.

#### Headers 📃
<table>
<thead>
  <tr>
    <th>Header</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Authorization</td>
    <td><code>Bearer :TOKEN</code><br>The token can be obtained after <code>/_/login</code>.</td>
  </tr>
</tbody>
</table>


### - **GET** 
` https://airbin.deno.dev/_/me `

This request gets the user detail of the authenticated token (if accessing from program need to specify `x-user` header with value of userid).

#### Headers 📃
<table>
<thead>
  <tr>
    <th>Header</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Authorization</td>
    <td><code>Bearer :TOKEN</code><br>The token can be obtained after <code>/_/login</code>.</td>
  </tr>
  <tr>
    <td>x-user</td>
    <td><code>:USER_ID</code><br>The userid only to be specified when accessing via curl or scripts</td>
  </tr>
</tbody>
</table>



## For Self Hosting
airbin can be selfhosted on any platform supporting deno after that just setup the `Config.js` and `.ENV` files.

Here `ONLY_SELF_HOSTING` means that login via github will be disabled and only admin can create the airbases via `/_/create?airbase=Name` 

What is `ADMIN_TOKEN`? it is the token which admin specify to access any value and create airbases. Here admins means the one who is hosting.

#### ℹ ENV SPECIFICATIONS 
<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>API_KEY</td>
    <td>The airtable personal access token.</td>
  </tr>
  <tr>
    <td>WORKSPACE_KEY</td>
    <td>The airtable workspace id.</td>
  </tr>
  <tr>
    <td>WORKSPACE_KEY</td>
    <td>The airtable workspace id.</td>
  </tr>
  <tr>
    <td>CLIENT_ID</td>
    <td>Github oauth app client id optional for only self hosting.</td>
  </tr>
  <tr>
    <td>CLIENT_SECRET</td>
    <td>Github oauth app client secret optional for only self hosting.</td>
  </tr>
  <tr>
    <td>HASH_SECRET</td>
    <td>This secret is used to generate user tokens so keep it private and hard to guess.</td>
  </tr>
  <tr>
    <td>ADMIN_TOKEN</td>
    <td>This is special admin token from which admin can access any airbase commands.</td>
  </tr>
</tbody>
</table>

Note : Airtable has api limit of `5 req/sec`


## Bugs? 
create the issue in the repo and i will try to fix it most probably.

#### No UI? small changes?, well contributions are welcomed.


## Credits
- author : [shivzee](https://github.com/shivam1608)
- IDE used : [Visual Studio Code](https://code.visualstudio.com/)
- [Gitpod](https://gitpod.io)

### HOSTED ON DENO DEPLOY
[Deno.land](https://deno.land) 
