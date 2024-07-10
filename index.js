import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

async function getURL() {
    try {
      const answers = await inquirer.prompt([
        {
          name: "url",
          message: "Enter a url: ",
          type: "input"
        }
      ]);
      return answers.url;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function generateQR(url){

    try {
        const qrCode = qr.image(url, { type: 'png' });
        const output = fs.createWriteStream('qrcode.png');
        qrCode.pipe(output);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    
    

  }
  
  async function main() {
    const url = await getURL();
    console.log('URL:', url);
    // Add your main program logic here
    fs.appendFile("url.txt", url, (err) => {
        if(err) throw err;
        console.log("file saved");
    })

    generateQR(url);
  }
  
  // Call the main function to start the program
  main();