
### **Project Overview: Dynamic Service Routing with Traefik**

This repository demonstrates how to use **Traefik** as a reverse proxy and load balancer for Dockerized applications. **Traefik** is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy. It integrates well with Docker and automatically manages dynamic configurations.

The repository focuses on:
- Setting up **Traefik** for routing multiple services.
- Defining routing rules using Docker labels.
- Using Docker Compose for easy setup.

---

### **Prerequisites**

- **Docker**: Ensure Docker is installed on your system.
- **Docker Compose**: You will also need Docker Compose to orchestrate the setup.

---

### **Project Structure**

- **`docker-compose.yml`**: The main Docker Compose file that sets up the Traefik proxy and a few sample services.
- **Traefik Configuration**: The configuration for Traefik is handled via Docker labels and the `docker-compose.yml` file.

---

### **Step-by-Step Guide**

#### 1. **Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/dockersamples/easy-http-routing-with-traefik.git
cd easy-http-routing-with-traefik
```

#### 2. **Review the `docker-compose.yml` File**

The `docker-compose.yml` file contains the configuration for:

- **Traefik service**: Defined as the reverse proxy for your services.
- **Whoami services**: A simple containerized service to test routing (two instances of `whoami` are defined for load balancing).

Here's an excerpt from the `docker-compose.yml` file:

```yaml
services:
  traefik:
    image: "traefik:v2.9"
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"

  whoami1:
    image: "containous/whoami"
    labels:
      - "traefik.http.routers.whoami1.rule=Host(`whoami1.localhost`)"
      - "traefik.http.services.whoami1.loadbalancer.server.port=80"

  whoami2:
    image: "containous/whoami"
    labels:
      - "traefik.http.routers.whoami2.rule=Host(`whoami2.localhost`)"
      - "traefik.http.services.whoami2.loadbalancer.server.port=80"
```

- The **Traefik service** listens on port 80 and 8080 (the latter is for Traefik’s dashboard).
- Two instances of the **whoami service** are defined, each with their own routing rules using Docker labels.

#### 3. **Start the Services**

To start the services, use Docker Compose:

```bash
docker-compose up -d
```

This will start Traefik and the two whoami services in detached mode.

#### 4. **Access Traefik Dashboard**

Traefik comes with a dashboard that lets you monitor routing and services.

Open your browser and visit:

```
http://localhost:8080
```

You should see the Traefik dashboard.

#### 5. **Test Routing**

To test the HTTP routing, use the following hosts:

- For **whoami1**: [http://whoami1.localhost](http://whoami1.localhost)
- For **whoami2**: [http://whoami2.localhost](http://whoami2.localhost)

You will need to update your `hosts` file to point `whoami1.localhost` and `whoami2.localhost` to `127.0.0.1`.

Add these lines to your `/etc/hosts` (Linux/Mac) or `C:\Windows\System32\drivers\etc\hosts` (Windows) file:

```txt
127.0.0.1 whoami1.localhost
127.0.0.1 whoami2.localhost
```

After updating the hosts file, you can access the services using the URLs.

#### 6. **Stop the Services**

To stop and remove the containers, run:

```bash
docker-compose down
```

---

### **Additional Features**

- **Dynamic Configuration**: Traefik dynamically detects Docker services and routes traffic without needing to restart.
- **Load Balancing**: Traefik load-balances traffic between services based on your rules (like host headers or paths).
- **Monitoring**: The built-in Traefik dashboard allows monitoring of routing status, load balancing, and other metrics.

---

### **Conclusion**

This repository offers a simple way to use Traefik to route traffic between different services based on host headers. It leverages Docker labels to define routing rules, which is very convenient in Dockerized environments.

You can expand on this by adding more services and defining custom routing logic using Traefik’s features like middleware, TLS termination, or advanced load balancing strategies.

