import { useState } from "react";
import { 
  Grommet, 
  Header, 
  Page, 
  PageContent, 
  PageHeader, 
  Text,
  Button,
  CheckBox,
  Form,
  FormField,
  TextArea,
  RadioButtonGroup,
  Select,
  Anchor,
  AnnounceContext,
  Box,
  Paragraph,
} from 'grommet'
import { Announce } from 'grommet-icons';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const message = `Thank you for clicking the Announce Button,
16this announcement is being broadcast on the Button's click.`;

const AppBar = (props) => (
  <Header
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
      {...props}
    />
  );

const App = () => {

  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    let m = {
      'message' : message
    }
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(m)
    })

    console.log(`sending an SMS with message: ${message}`)
    setMessage('')
    setSent(true)

  }

  const SentMessage = () => {
    return (
      <Paragraph textAlign="center">
        Message sent! Check the LCD, or
        <Anchor
        label=" learn how it works!"
        href="https://www.codecademy.com/articles/how-to-setup-screen-reader#:~:text=(OS%20X)%20VoiceOver,Command%2DF5%20turns%20it%20off."
        />
      </Paragraph>
    )
  }

  return (
    <Grommet theme={theme}>
      <Box align="center" justify="center" gap="medium" fill>
          <PageHeader title="Welcome!" subtitle='Thanks for scanning. You can send me a message here and it will text my phone - christian'/>
            <Form onSubmit={onSubmit}>
              <TextArea name="message me!" label="type your message:" required={true} value={message} onChange={e => setMessage(e.target.value)} />
              <Button type="submit" label="send to christian's phone" primary={true} />
            </Form>
            {sent ? <SentMessage /> : null}
           
        </Box>
    </Grommet>
  );
}


export default App;
