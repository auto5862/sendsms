const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const params = new URLSearchParams();
    params.append('user', 'EsoftInc');       
    params.append('key', '97ad0956acXX');     
    params.append('mobile', to);              
    params.append('message', encodeURIComponent(message)); 
    params.append('senderid', 'TESTBK');      
    params.append('accusage', '3');           
    params.append('unicode', '1');            

    const response = await axios.post('http://login.esoft.asia/submitsms.jsp', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.data.includes('success') || response.data.includes('SUCCESS') || response.data.includes('성공')) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: response.data });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
