

FROM node:18-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]



#                                     A. Command  to Build this Image :
# docker build . -t "typescript"

# Explanation :
# 1. docker build: The command to build a Docker image.
# 2. "."" : The build context (current directory : This is where your Dockerfile is located. When you use . in the build command, Docker will use this directory as the build context, meaning) where the Dockerfile is located.
# 3. -t "typescript": Tags the image with the name "typescript" .

#                                     B. Command to run this Image after the build:
#  docker run -it -p 3000:3000 your-image-name

#  Each part explained:

# 1. docker run: Command to create and start a new container

# 2. -it: Combination of two flags:

#     A.-i (interactive): Keeps STDIN open

#     B. -t (tty): Allocates a pseudo-terminal, giving you terminal access

# 3. -p 3000:3000: Port mapping/forwarding

#      A. First 3000: Host port (your machine)

#      B. Second 3000: Container port (inside Docker)

#      C. Format is host-port:container-port

# 4. your-image-name: The name of the Docker image to run (in your case, it would be "typescript")


# >                               What this does:

# Creates a new container from your image

# Maps port 3000 from the container to port 3000 on your host machine

# Provides an interactive terminal session

# Your React app will be accessible at http://localhost:3000.


#                                C. Additional useful flags you might want to use:
# docker run -it -d -v --rm -p 3000:3000 --name typescript-app typescript 

# --rm: Automatically remove the container when it exits

# -it:  if you want to interact with the container

# -d: Run in detached mode (  if you want to run it in the background )

# --name: Give your container a specific name

# -v: Mount a volume ( A volume mount in Docker creates a way to persist and share data between the container and the host system ( User Machine ), or between multiple containers. )


#  NOTE: 
#  That you can't use both interactive terminal ( -it) and detached mode ( -d) effectively at the same time since they serve opposite purposes - one is for interaction and the other is for background running. Choose the one that better suits your needs:
# Improved : # docker run -it  -v --rm -p 3000:3000 --name typescript-app typescript 

#                                     Networking In Docker :
# 1. Bridge Networking
# Bridge networking is the default network driver in Docker. When you create a container, it is automatically connected to a bridge network unless you specify otherwise. This network allows containers to communicate with each other through a virtual bridge that Docker creates on the host machine.
# Command : docker network inspect bridge

#  Containers on the same bridge network can communicate with each other using their container names as hostnames.


# 2. Host Networking
# Host networking removes the network isolation between the Docker container and the Docker host. When you use host networking, the container shares the host's network stack and can directly access the host's network interfaces.

#  In this mode, the container will use the host's IP address and ports.

#  Note : In Host Networking, while running the container we don't need to set port like : -p 3000:3000 ( Because our host machine and docker container are on the same network )