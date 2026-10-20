

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["NidhiPortfolioUp/NidhiPortfolioUp.csproj", "NidhiPortfolioUp/"]
RUN dotnet restore "NidhiPortfolioUp/NidhiPortfolioUp.csproj"

COPY . .
WORKDIR /src/NidhiPortfolioUp
RUN dotnet publish "NidhiPortfolioUp.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_HTTP_PORTS=10000
EXPOSE 10000
ENTRYPOINT ["dotnet", "NidhiPortfolioUp.dll"]
