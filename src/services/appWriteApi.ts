import { Client, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('http://192.168.1.5/v1')
    .setProject('634c995f185841b597e0');

const account = new Account(client)

export { client, account, ID }