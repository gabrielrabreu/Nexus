FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore

WORKDIR "/src/src/Modularis.WebApi"
RUN dotnet build "Modularis.WebApi.csproj" -c Release -o /app/build

RUN dotnet publish "Modularis.WebApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV Serilog__MinimumLevel__Default="Information"
ENV Serilog__MinimumLevel__Override__Microsoft_AspNetCore="Warning"

EXPOSE 8080

ENTRYPOINT ["dotnet", "Modularis.WebApi.dll"]
