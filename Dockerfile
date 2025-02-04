

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
# docker run -it --rm -p 3000:3000 --name typescript-app typescript

    # --rm: Automatically remove the container when it exits

    # -d: Run in detached mode (background)

    # --name: Give your container a specific name

    # -v: Mount a volume ( A volume mount in Docker creates a way to persist and share data between the container and the host system, or between multiple containers. )