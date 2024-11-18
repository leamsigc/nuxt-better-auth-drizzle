ARG NODE_VERSION=22.10.0
# Create build stage
FROM node:${NODE_VERSION}-slim AS build
# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and pnpm-lock.yaml files to the working directory

COPY ./package.json /app/
COPY ./pnpm-lock.yaml /app/

## Install dependencies
RUN pnpm i --shamefully-hoist
# Copy the rest of the application files to the working directory
COPY . ./


# Show on the console the values of the build-time arguments
RUN echo "NUXT_SESSION_PASSWORD: ${NUXT_SESSION_PASSWORD}"

# Build the application
RUN pnpm build


# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim as production


# Set the working directory inside the container
WORKDIR /app
# Copy the output from the build stage to the working directory

COPY --from=build /app/.output .output
COPY --from=build /app/.env .env
# Define environment variables
ENV NODE_ENV=production
# Expose the port the application will run on
EXPOSE 3000
# Start the application

CMD ["node",".output/server/index.mjs"]