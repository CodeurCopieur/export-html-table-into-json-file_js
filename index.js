//namespace shaker
var Shaker = (() => {
  var self = {};

  //Methode public car nous pouvons l'appeler de l'extérieur
  //Structure appeler le module parttern
  self.init = () => {

    const searchResult = document.querySelector('.table-results');
    var table = document.getElementById('table');
    var custom_btn = document.getElementById('custom-btn');


    async function getUsers() {

      res = await fetch("https://randomuser.me/api/?nat=fr&results=50")

      // destructuring afin d'atteindre la propriété results
      const {
        results
      } = await res.json()

      // afin d'insérer chaque user dans le DOM
      createUserList(results)

      var myjSON = JSON.stringify(tableToJson(table));
      
      function downloadObjectJson(exportObj, exportName) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
        var link = document.createElement('a');
        link.setAttribute('href', dataStr);
        link.setAttribute('download', exportName+'.json');
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      
      
      custom_btn.onclick = function(e) {
        e.preventDefault()
        downloadObjectJson(myjSON, 'the-json-file');
      }
    }

    getUsers()

    function createUserList(dataArray) {

      if (dataArray) {

        for (const key in dataArray) {
          const element = dataArray[key];

          let template = `<tr>
                <td>${dataArray[key].name.last} ${dataArray[key].name.first}</td>
                <td>${dataArray[key].email}</td>
                <td>${dataArray[key].phone}</td>
              </tr>`;

          searchResult.insertAdjacentHTML('beforeend', template);

        }
      }
    }
    
    function tableToJson(table) {
      // data : contenir les objects
      var data = [];
      //headers : contenir la première ligne(thead)
      var headers = [];

      // boucle sur les elements du head(thead)
      for (let index = 0; index < table.rows[0].cells.length; index++) {
        headers[index] = table.rows[0].cells[index].innerHTML.toLowerCase().replace(/ /gi, '');
      }

      // boucle sur les elements du tbody(tbody)
      for (var index = 1; index < table.rows.length; index++) {

        const tableRow = table.rows[index]; // chaque tr
        var rowData = {};

        for (var j = 0; j < tableRow.cells.length; j++) {
          // on insère dans l'object rowData chaque contenu des td qui ont pour clés(headers[j])
          rowData[headers[j]] = tableRow.cells[j].innerHTML;
        }
        // on insère chaque object dans le tableau data
        data.push(rowData);
      }
      return data;
    }
  }
  return self;
})(); //closure qui s'appelle elle même ()


Shaker.init();