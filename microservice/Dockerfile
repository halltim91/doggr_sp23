FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 5144
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["microservice.csproj", "./"]
RUN dotnet restore "./microservice.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "microservice.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "microservice.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "microservice.dll"]
