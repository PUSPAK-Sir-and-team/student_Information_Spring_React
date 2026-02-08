# Use Java 17 (change if you use 11)
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy jar file into container
COPY target/*.jar app.jar

# Expose application port. Update prt number as per requirement of the server port.
EXPOSE 8080 

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
