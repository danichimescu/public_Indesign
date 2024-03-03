var myFile_calea = app.documents[0].filePath;
var myFileName_full = app.documents[0].fullName + "";
var myFileName = app.documents[0].name + "";
var myFileNameInfo = "Info";
function main() {


    var csvFilter = function (f) { return /\.csv$/i.test(f.name); },


        // f = File.openDialog("Please select the CSV File…", csvFilter, false),

        // f = File.openDialog("Please select the CSV File…", csvFilter),
       
        
        // var definitionsFile = File(myFile_calea + "/" + myFileNameInfo + ".txt");
        f = File(myFile_calea + "/" + myFileNameInfo + ".csv", csvFilter, false);
        docsData = [],


        csvSep = ",",


        csvContent,


        csvHeaders,


        s,


        n,


        w,


        h,


        m,


        b,


        a;



    if (!f) return;



    f.open('r');


    csvHeaders = f.readln().split(",");


    while (!f.eof) {


        s = f.readln().split(",");


        if (s.length >= 5) {



            w = Number(s[1]);


            h = Number(s[0]);


            m = Number(s[2]);


            b = Number(s[3]);


            a = Boolean(s[4]);



            !isNaN(w)


                && !isNaN(w)


                && !isNaN(w)


                && !isNaN(w)


                && makeDoc({ w: w, h: h, m: m, b: b, a: a });


        }


    }



};




function makeDoc(data) {


    var d = app.documents.add();


    var p = {


        pageHeight: data.h,


        pageWidth: data.w,


        documentBleedUniformSize: data.a,


        documentBleedTopOffset: data.b,


    }



    d.documentPreferences.properties = p;


    var mp = d.masterSpreads.everyItem().pages.everyItem().getElements();


    var n = mp.length;


    while (n--) {


        mp.marginPreferences.top = mp.marginPreferences.bottom = mp.marginPreferences.right = mp.marginPreferences.left = data.m;


    }


}




main();