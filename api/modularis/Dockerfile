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

EXPOSE 8080

ENV ConnectionStrings__SqlServer=$ConnectionStrings__SqlServer
ENV Datadog__ApiKey=$Datadog__ApiKey
ENV Datadog__Service=$Datadog__Service
ENV Datadog__Host=$Datadog__Host
ENV Datadog__Url=$Datadog__Url

ENTRYPOINT ["dotnet", "Modularis.WebApi.dll"]
