<div align='center'>
    <h1><b>EasyClaim</b></h1>
    <h2>by Ganesh Asapu, Nauhar Kapur, Raunak Madan, Vibhas Raizada, and Caesar Saleh</h2>
</div>


<div align='center'>
<h3><em>Consistent Adjudication, Made Easy</em></h3>
</div>

<br>
    
<div align='center'>
<img width="600" alt="Screenshot 2023-12-07 at 9 29 26 PM" src="https://github.com/ganeshasapu/easyclaim/assets/144617434/5b869982-068a-475f-8dad-91eea3bf5d9f">
</div>

_______

<div>
  Presenting EasyClaim, a platform to streamline and digitize the adjudication process for <em><b>Securian Canada</b></em>.
  <br><br>
  This project was made as part of the <em><b>Technology Leadership Initative's</b></em> integrated-industry project at the <em><b>University of Toronto</b></em>.
</div>

<h3>View the deployed project <a href="https://easyclaim.vercel.app"> here </a> </h3>

<hr>

<div>
  <h3> Our expected features <em>(WIP)</em>: </h3>

  <ul>
    <li> An inbox page to view claims submitted by policyholders </li>
    <li> A 'historical claims' page to view previous </li>
    <li> Viewable claims that feature submitted pdf's and a side display listing the main </li>
    <ul>
      <li> An algorithm that displays claims similar to the claim being currently viewed, and the recommended next steps in the process </li>
      <li> Assisting in processing claims faster based on precedent </li>
    </ul>
  </ul>
</div>

<div>
  <h3> Tech Stack: </h3>
  <ul>
    <li> Frontend in <em>React</em> and <em>Typescript</em> </li>
    <li> Backend in <em>Spring Boot</em> and <em>Java</em></li>
    <li> Database running on <em>Firebase</em></li>
    <li> Deployed using <em>Microsoft Azure</em></li>
  </ul>
</div>

<div>
  <h3> Main folder components: </h3>
  <ul>
    <li> <code> backend </code> </li>
      <ul>
        <li> Contains Folders following th Clean Arhcitecure Engine:</li>
          <ul>
            <li>Controllers</li>
            <li>Entity</li>
            <li>Firebase Initializer</li>
            <li>Services</li>
          </ul>
        <li>Spring Boot connection test file</li>
      </ul>
    <li> <code> dummy_data </code> </li>
      <ul>
        <li> Completed JSON files for: </li>
          <ul>
            <li>Disability Claims</li>
            <li>Employment Claims</li>
            <li>Life Claims</li>
          </ul>
        <li> Each JSON file contains <em>count</em> number of mock models based on specific number in <code>json_generator.py</code> </li>
      </ul>
    <li> <code> frontend </code> </li>
      <ul>
        <li> An app folder containg: </li>
          <ul>
            <li>Additional Components frontend file</li>
            <li>Database 'Historical Claims' page frontend file</li>
            <li>Inbox page frontend file</li>
          </ul>
      </ul>
    <li> <code> JSON Models </code> </li>
      <ul>
        <li> Blank JSON files for: </li>
          <ul>
            <li>Disability Claims</li>
            <li>Employment Claims</li>
            <li>Life Claims</li>
          </ul>
      </ul>
    <li> <code> json_generator.py </code> </li>
      <ul>
        <li>Python file use to automatically generate filled out JSON claim mock files</li>
      </ul>
  </ul>
</div>

_______

<div>
  <h3> Using json_generator to create JSON mock files: </h3>
  <ol>
    <li> Open <code>json_generator.py</code></li>
    <li> In the main branch at the bottom of the file, specifiy the count for the number of dummy JSON models you would like </li>
    <li> Run the file in your favourite compiler!</a> </li>
    <li> Check the <code>dummy_data</code> folder; each file in the folder contains <em>count</em> number of mock models, all placed into one compliation file for each type of claim</li>
  </ol>
</div>

<div>
  <h3>Running the program locally: </h3>
  <ol>
    <li> Install <a href="https://nodejs.org/en/"> node.js </a> with the command <code>npm i</code></li>
    <li> Get the firebase API key from <a href="https://github.com/CaesarSaleh"> CaesarSaleh </a> 
            <ul><li><em>This will be stored in a <code>.env</code> file that should NOT be made public or stored on the GitHub repo!</em></li></ul>
    <li> Run <code>npm run dev</code> in the Terminal</li>
    <li> Open <a href="http://localhost:3000"> http://localhost:3000 </a> </li>
  </ol>
</div>


