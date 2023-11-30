FROM eclipse-temurin:17-jre
ARG JAR_FILE=build/libs/Postery-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} Postery.jar
ENTRYPOINT ["java", "-jar", "/Postery.jar"]
EXPOSE 8080