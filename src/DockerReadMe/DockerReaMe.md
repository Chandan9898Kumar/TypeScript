### A. Command to Build this Image (Here we are not using .yml) :

**docker build . -t "typescript"**

`Explanation :`

1. `docker build:` The command to build a Docker image.

2. `".""` : The build context (current directory : This is where your Dockerfile is located. When you use . in the build command, Docker will use this directory as the build context, meaning) where the Dockerfile is located.

3. `-t` "typescript": Tags the image with the name "typescript" .

### B. Command to run this Image after the build:

`docker run -it -p 3000:3000 --name your-container-name your-image-name`

**Each part explained:**

1. `docker run:` Command to create and start a new container

2. `-it:` Combination of two flags:
   A. `-i (interactive):` Keeps STDIN open
   B. `-t (tty):` Allocates a pseudo-terminal, giving you terminal access

3. `-p 3000:3000:` Port mapping/forwarding
   A. `First 3000:` Host port (your machine)
   B. `Second 3000:` Container port (inside Docker)
   C. Format is host-port:container-port

4. your-image-name: The name of the Docker image to run (in your case, it would be "typescript")

5. After --name put your-container-name

# What this does:

1. Creates a new container from your image
2. Maps port 3000 from the container to port 3000 on your host machine
3. Provides an interactive terminal session
4. Your React app will be accessible at http://localhost:3000.

### Points

1. if you want to run docker container in detached mode( if you want to run it in the background ) then use :

`docker run -d -p 3000:3000 --name your-container-name your-image-name`

> NOTE : That you can't use both interactive terminal ( -it) and detached mode ( -d) effectively at the same time since they serve opposite purposes - one is for interaction and the other is for background running. Choose the one that better suits your needs:

2. **If you want to use Volume in the container the use** :

A. `docker run -it --rm -p 3000:3000 -v "${pwd}:/app" -v "/app/node_modules" --name typescript-app typescript`

B. `docker run -it --rm -p 3000:3000 -v "${pwd}:/app" -v "container-volume:/app/node_modules" --name typescript-app typescript`

C. `docker run -it --rm -p 3000:3000 -v "${pwd}:/app:ro" -v "container-volume:/app/node_modules" --name typescript-app typescript`

**This approach uses two volume mounts:**

1. The first mount `-v "${pwd}:/app"` syncs your local directory with the container.Here volume in your command ( $(pwd):/app) is actually a bind mount, not a volume, so it doesn't need a volume name as it's directly mapping your current directory to the container.
   a. Mounts your current directory  ${pwd} to /app in the container .
   b. Any changes in your local src folder will be reflected in the container .
   c.Changes made inside the container will appear in your local directory .


2. A. The second mount `-v "/app/node_modules"` creates an anonymous volume for the node_modules directory, preventing it from being overwritten by the host's files.
   a. Creates a separate volume for node_modules. ( This is called "volume mounting" which prevents the container's node_modules from being overwritten )
   b. Prevents local node_modules from overwriting container's modules

3. B. -v `"container-volume:/app/node_modules"` here `container-volume` is the name of the volume separated by `:`

4. `${pwd}` is the current working directory on your host machine

5. `/app` is the directory inside the container (matching your WORKDIR)

6. The colon `:` separates the host path from the container path.

`This will sync your local directory with the container's /app directory, allowing you to:`

1. Your `local changes will be reflected in the container ( Make changes to your code locally and see them reflected in the container )`
2. The node_modules directory inside the container remains isolated and intact
3. You avoid conflicts between host and container dependencies

**This is Read-Only Bind Mount**
C. ` "${pwd}:/app:ro" ` :
a.  Mounts the directory as read-only.
b. Prevents container from modifying host files.(if you do any changes inside the container by going inside the container , then those changes will not be reflected in your local directory. But any changes inside the your local directory happens then it will also gets reflected in the container .)

# NOTE

1. `-v:` Mount a volume ( A volume mount in Docker creates a way to persist and share data between the container and the host system ( User Machine ), or between multiple containers.)

2. The `--rm` flag automatically removes the container and its file system when the container exits. Here's what it does specifically:

A. `When the container stops running (either naturally or by force), Docker will:`

1. Delete the container
2. Clean up any associated file systems
3. Free up disk space used by the container

B. `This flag is particularly useful when:`

1. Running temporary containers for development or testing
2. You don't need to keep container history
3. You want to avoid accumulating stopped containers on your system
4. You're running short-lived containers that you won't need to restart

C. `Without --rm:`

1. Stopped containers remain in your system
2. You'd need to manually remove them using docker rm <container-id>
3. They continue to take up disk space
4. You can see them when running docker ps -a

D. `With --rm:`

1. Container is automatically cleaned up after exit
2. Saves disk space
3. Reduces clutter in your Docker environment
4. You don't need to manage container cleanup manually

E. `Important note: The --rm flag only removes the container and its filesystem.`
`It does not:`

1. Remove the Docker image
2. Delete any named volumes you've created. ( if the volume has no name then it will be removed)
3. Affect your source code or mounted volumes

### Commands For Volumes :

# 1. List all volumes

docker volume ls

# 2. Remove a specific named volume

docker volume rm give_volume_name_here

# 3. Remove all unused volumes

docker volume prune

# 4. Create a named volume

docker volume create my-volume

> NOTE : We can share the volume with multiple containers.

> Think of a Docker volume as a shared folder that multiple containers can access - similar to how multiple programs on your computer can access the same folder.

# Networking In Docker :

1. **Docker provides several networking modes to handle container communication**

1. `Bridge Networking (Default)`
   Bridge networking is the default network driver in Docker. When you create a container, it is automatically connected to a bridge network unless you specify otherwise. This network allows containers to communicate with each other through a virtual bridge that Docker creates on the host machine.
   `Command :` docker network inspect bridge

`Key characteristics:`

1. Default network driver in Docker
2. Creates a virtual network bridge on the host machine
3. Containers can communicate with each other using container names as hostnames
4. Requires port mapping (-p flag) to access container services from host
5. Suitable for standalone containers on a single host

> Containers on the same bridge network can communicate with each other using their container names as hostnames.

2. `Host Networking`
   Host networking removes the network isolation between the Docker container and the Docker host. When you use host networking, the container shares the host's network stack and can directly access the host's network interfaces.

In this mode, the container will use the host's IP address and ports.

> Note : In Host Networking, while running the container we don't need to set port like : -p 3000:3000 ( Because our host machine and docker container are on the same network )

`Key characteristics:`

1. Removes network isolation between container and host
2. Container shares host's network stack directly
3. No need for port mapping as container uses host's network interface
4. Better performance but less network security isolation
5. Limited to one container per port on the host
6. AWSVPC Mode (Specific to Amazon ECS)
7. Provides each task with its own elastic network interface (ENI)
8. Gives containers the same networking properties as EC2 instances
9. Recommended for AWS ECS tasks unless there's a specific need for other modes

**Best Practices:**

1. Use b`ridge networking` when you need isolation between containers and host

2. Use `host networking` when:
   A. You need maximum network performance
   B. You need to bind to specific host network interfaces
   C. Port mapping isn't required (-p 3000:3000 )

### Network Commands:

# View network details

docker network inspect bridge

# List all networks

docker network ls

# Create a custom network

docker network create my-network

# Connect a container to a network

docker network connect my-network container-name

**For container-to-container communication in bridge mode, you can use:**

# Run first container

docker run --name container1 my-image

# Run second container and link to first

docker run --name container2 --link container1 my-image
