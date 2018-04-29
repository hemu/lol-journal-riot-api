// import jwtDecode from 'jwt-decode';

// export default (event) => {
//   if (!event.headers || !event.headers.Authorization) return null;
//   const authToken = event.headers.Authorization;
//   console.log(authToken);
//   const userDetails = jwtDecode(authToken);
//   console.log(userDetails);
//   if (!userDetails) return null;

//   const summoner = userDetails['custom:summoner-name'];
//   const accountId = userDetails.accountId;
//   return {
//     summoner,
//     accountId,
//   };
// };
