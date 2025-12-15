
# JWT_TOKEN.md

# JWT Authentication Integration (Frontend → Multiple Backends)

The frontend sends a **JWT access token** with every request to protected backend routes.

---

## What Your Backend Needs to Do

For protected endpoints that need the UserId to access, your backend needs to:

- Verify the JWT signature
- Validate token expiration
- Extract user identity (`userId`, `role`, etc.)

Once you extract `userId`, you can:

- Build your own database schema around it, or
- Query/access your own database using that `userId`

---

## Step 1: Add Environment Variable
Create a `.env` file in your backend repo:

```env
JWT_SECRET=********
````

* we should have the **same** JWT_SECRET value
* **Do NOT commit this file** to Git.
>  For security reasons, I will not include the JWT secret in this repo.  
> Please contact me at **yutong.wu@mailbox.tu-dresden.de** to get the secret 
---

## Step 2: Add JWT Auth Middleware

add the file:

```text
middleware/auth.middleware.js
```
> check my repo middleware/auth.middleware.js for reference or consult AI



---

## Step 3: Use Middleware in Routes

Example of a protected endpoint:

```js
import { authenticate } from "../middleware/auth.middleware.js";

router.get("/orders", authenticate, async (req, res) => {
  const userId = req.user.id;

  // Use userId to query your own database
  const orders = await Order.find({ userId });

  res.json(orders);
});
```

> Any route that requires authentication should include this middleware.

---

## Important Notes

* Only **login endpoint** issues JWT tokens
* Other backends only **verify and decode tokens**


---

## Summary

* Frontend sends JWT to all backends
* All backends share the same JWT secret
* Each backend verifies the token independently
* `userId` from the token is used for user-specific data

---

> For questions or the JWT secret, please contact: **[yutong.wu@mailbox.tu-dresden.de](mailto:yutong.wu@mailbox.tu-dresden.de)**

```

