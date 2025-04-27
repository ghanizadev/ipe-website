FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

ARG USERNAME=dev
ARG USER_UID=1001
ARG USER_GID=$USER_UID

# Create the specified user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/bash

USER $USERNAME