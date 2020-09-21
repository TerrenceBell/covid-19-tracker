export const sortData = (data) => { 
    const sortedData = [...data]
 return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1)) 
};     
      


//this function sorts the table by cases from largest to smallest
// then its imported into app.js to funciton