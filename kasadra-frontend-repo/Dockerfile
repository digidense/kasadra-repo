FROM node:18

# Set working directory
WORKDIR /app

# Copy the React artifact zip file
COPY artifact.zip ./artifact.zip


#######################################
### Updated npm version
######################################
RUN apt-get update && apt-get install -y unzip gettext-base && \
    npm install -g serve --registry=https://registry.npmjs.org/ && \
    unzip artifact.zip -d . && \
    rm /app/artifact.zip

##############################################

# Work inside dist folder
WORKDIR /app/kasadra_frontend/dist

# Copy entrypoint script
COPY kasadra_frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 5173

# Run entrypoint which will generate config.js and then start serve
ENTRYPOINT ["/entrypoint.sh"]
CMD ["serve", "-s", ".", "-l", "5173"]





