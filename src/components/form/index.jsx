import React from 'react';
import Section from '../section';

const Form = ({}) => {
    return (
      <Section title="Contact Me">
        <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify-recaptcha="true" data-netlify="true">
            <p class="hidden">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>
            <p>
                <label>Name: <input type="text" name="name" class="block border border-gray-400" /></label>
            </p>
            <p>
                <label>Email: <input type="text" name="email" class="block border border-gray-400" /></label>
            </p>
            <p>
                <label>Message: <textarea name="message" class="block border border-gray-400"></textarea></label>
            </p>
            <div data-netlify-recaptcha="true"></div>
            <p>
                <button type="submit" class="bg-blue-600">Send</button>
            </p>
        </form>
      </Section>
    );
  };
  
  export default Form;