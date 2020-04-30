export const getFile = (filename, location) => {      
    let spl = filename.split('.')
    let img = ['png','jpg', 'jpeg', 'gif', 'bmp']
    let xls = ['xls', 'xlsx','csv']
    let doc = ['doc', 'docx', 'txt']
    if(img.includes(spl[1])){
        return location
    }else if(spl[1] == 'pdf'){
        return 'https://banner2.cleanpng.com/20180420/ypq/kisspng-pdf-computer-icons-theme-clip-art-cool-business-card-background-5ad9c522531736.0976301015242212183404.jpg'
    }else if(xls.includes(spl[1])){
        return 'https://banner2.cleanpng.com/20180702/hph/kisspng-computer-icons-google-sheets-5b3a2f1b216e87.3834502715305398031369.jpg'
    }else if(doc.includes(spl[1])){
      return 'https://banner2.cleanpng.com/20180724/bsf/kisspng-google-docs-computer-icons-microsoft-google-drive-google-icon-5b56c718d11477.1116395315324137208564.jpg'
    }
    return spl[1]
}