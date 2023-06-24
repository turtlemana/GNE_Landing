import NextAuth from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProviders({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
       async authorize(credentials,req) {
        // Add your own logic here to find the user and compare the password
        // If the credentials are valid, you can return an object where the key 'id'
        // is the ID of the user record, and the 'name' and 'email' are returned
        // If the credentials are invalid, or the account does not exist, return null

        const user = { id: "1", name: "Admin User", email: "admin@example.com" };
        const desiredUsername = process.env.ADMIN_ID;
        const desiredPassword = process.env.ADMIN_PASSWORD;
       
        if (credentials && credentials.username === desiredUsername && credentials.password === desiredPassword) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
      },
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,

  session:{
    strategy:'jwt',
  },
  jwt:{
    secret: process.env.NEXTAUTH_SECRET,

  },
  pages: {
    // If there is a platform error or configuration error you can display a custom error message
    error: '/admin/password', // Error code passed in query string as ?error=
  },
});