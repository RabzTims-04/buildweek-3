import PdfPrinter from "pdfmake"

export const generatePDFReadableStream = (obj,img) => {

    let rows= []

    rows.push([
        {text: 'Role', font:"GrandRoyal", fontSize: 12}, 
        {text: 'Company', font:"GrandRoyal", fontSize: 12}, 
        {text:'Description', font:"GrandRoyal", fontSize: 12}, 
        {text:'Area', font:"GrandRoyal", fontSize: 12},
        {text:'Start Date', font:"GrandRoyal", fontSize: 12},
        {text:'End Date', font:"GrandRoyal" ,fontSize: 12}
    ])

    obj.experiences.map(exp => {
        rows.push([
            {text: exp.role, font:"Chigoda" ,fontSize: 12},
            {text: exp.company, font:"Chigoda" ,fontSize: 12},
            {text: exp.description, font:"Chigoda" ,fontSize: 12},
            {text: exp.area, font:"Chigoda" ,fontSize: 12},
            {text: new Date(exp.startDate).toLocaleDateString(), font:"Chigoda" ,fontSize: 12},
            {text: new Date(exp.endDate).toLocaleDateString(), font:"Chigoda" ,fontSize: 12}
        ])
    })

    console.log("rows", rows);
    
    const fonts = {
        Roboto:{
            normal: "Helvetica",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-Oblique"
        },
        hello:{
            normal:"src/lib/fonts/hello.ttf"
        },
        MidnightInOctober:{
            normal:"src/lib/fonts/Midnight in October - TTF.ttf"
        },
        Chigoda:{
            normal:"src/lib/fonts/Chigoda.ttf"
        },
        Vogue:{
            normal:"src/lib/fonts/Vogue.ttf"
        },
        GrandRoyal:{
            normal:"src/lib/fonts/Grand Royal.ttf"
        }
    }

    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content:[ 
            {
                text:`${obj.name}'s Resume`,
                alignment:'center',
                fontSize: 48,
                font:"hello",
                margin:[0,10,0,10]
            }, 
            {
                image:img,
                width:200,
                height:200,
                margin:[0,10,0,10],
                alignment:"right",
                absolutePosition: {x: 0, y:125}
            } ,      
            {
                text:`Name: ${obj.name}`,
                alignment:'left',
                fontSize: 24,
                font:"Roboto",
                margin:[0,10,0,10]
            },
            {
                text:`Surname: ${obj.surname}`,
                alignment:'left',
                fontSize: 24,
                font:"Roboto",
                margin:[0,10,0,10]
            },
            {
                text:`Email: ${obj.email}`,
                alignment:'left',
                fontSize: 24,
                font:"Roboto",
                margin:[0,10,0,10]
            },
            {
                text:`Bio: ${obj.bio}`,
                alignment:'left',
                fontSize: 24,
                font:"Roboto",
                margin:[0,10,0,10]
            },
            {
                text:`Title: ${obj.title}`,
                alignment:'left',
                fontSize: 24,
                font:"Roboto",
                margin:[0,10,0,10]
            },
            {
                text:`Area: ${obj.area}`,
                alignment:'left',
                fontSize: 24,
                font:"Roboto",
                margin:[0,10,0,10]
            },
            {
                text:`Experiences`,
                alignment:'left',
                fontSize: 48,
                font:"hello",
                margin:[0,10,0,10]
            },
            {   style: 'table',
                table: {
                    headerRows: 1,
                    widths: ['15%', '15%', '15%', '15%', '20%', '20%'],
                    body: rows
                },
            }   
        ]
    }

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition)
    pdfReadableStream.end()
    return pdfReadableStream
}