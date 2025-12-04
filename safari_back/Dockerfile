FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY ./target/*.jar safari_back.jar

CMD [ "java", "-jar", "safari_back.jar" ]

EXPOSE 8080
