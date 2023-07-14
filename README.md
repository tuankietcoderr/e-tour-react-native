# E-Tour

![E-tour](assets/icon-transparent.png)

## Description

The E-Tour application allows companies to create an account and submit a profile to approve the use and administration of that company's travel system.

Each company will have the following types of management:

1. **Tourist Route Manager:**
   Each tourist route starts at a place, takes tourists to visit (can rest
   overnight) at locations, finally returning to the starting point. Each line has a time
   organization time (eg 5 days 4 nights).
   _- Company employees can add, look up, delete or update the information of the route
   calendar._

- _When deleting or updating tour information, employees can use the search function
  save travel route_
  There are 2 types of tour routes:
- Domestic routes: visitors must buy tickets 24 hours before departure. If pay
  Tickets 4 hours before departure, no refund fee
  If you are late, otherwise, you will have to pay a late refund fee of 100,000 VND
  copper.
- International routes: visitors must buy tickets 7 days before departure. If paying for tickets 3
  days before departure, there will be no additional refund fee
  Late tickets, on the contrary, visitors will have to pay an additional fee of 50 USD.

2. **Tour Management:**
   With each tour route, the company will organize tours. Every trip
   belonging to only one travel route, with departure time (date and time) and general fare
   for tourists (regardless of domestic or foreign tourists).
   Please note that the possible fare of the tour is subject to change. Usually, if du
   If you buy tickets early, the ticket price will be cheaper.
   _The system allows company employees to add, search, delete or update information
   of travel._
   _When deleting or updating travel information, employees can use the function
   travel search._
   _When creating a trip, employees can use the route lookup function_.
   There are 2 types of tours:

- Regular tour : With regular fare (common for tourists
  at home or abroad). When returning the ticket, in addition to the late refund fee (if any), du
  100% refund of purchased ticket price.
- Promotional tour: With promotional fares lower than the regular price
  usually (generally for domestic or foreign tourists). When paying the ticket, in addition to the fee
  late refund fee (if any), visitors will be refunded 80% of the promotional fares already
  buy.

3. **Manage ticket purchase :**
   The system allows company employees to perform the following functions:

- Record, look up and update passengers' tickets.
- Passengers' tickets cannot be deleted.
  - When tourists need to return tickets, company staffs look up tickets by number and update again
    ticket status.
  - Each traveler has a separate ticket for a tour. In the ticket there is a ticket code and ticket price
    (at time of purchase).
    There are two types of visitors: domestic and foreign visitors
  - Visitors' information includes: full name, ID number (if domestic visitor)
    or passport number (if foreign visitor), address, phone number.
  - If the guest is a foreigner, it is necessary to record the expiry date of the passport and
    visa expiration date. (the system checks the expiration date of your passport and visa)
    Is the foreign visitor valid compared to the tour date?)

4. **Review:**

   Users can rate the company, the staff, or the quality of the route: star, comment. Or report unscrupulous businesses. Or report an application error.

## Technologies

- React Native (Expo)
- Typescript
- Redux, Redux Toolkit
- Google Firebase
- Socket IO
- Android

## Build

```bash
eas build -p android --profile preview
```

## Run

```bash
eas run -p android
```

## Publish

```bash
eas build -p android --profile release
```

## Installation

## Local development

### Clone the project

```bash
git clone https://github.com/tuankietcoderr/e-tour-react-native.git
```

```bash
cd e-tour-react-native
```

### Install dependencies

```bash
npm install
or
yarn install
```

### Usage

```bash
npm run start
or
yarn start
```

## APK file

[Download here](https://expo.dev/accounts/tuankietcoder/projects/e-tour/builds/bd78362e-8658-4313-ba30-22cdafe0b04a)

## Others repositories
1. Web management: https://e-tour-management.vercel.app/
2. Web admin: https://e-tour-admin.vercel.app/
