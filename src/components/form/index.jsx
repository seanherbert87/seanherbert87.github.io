import React from 'react';
import Section from '../section';

const Form = ({}) => {
    return (
      <Section title="Contact Me">
        <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
            <p class="hidden">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>
            <p>
                <label>Name: <input type="text" name="name" class="mb-4 block border border-gray-400" /></label>
            </p>
            <p>
                <label>Email: <input type="text" name="email" class="mb-4 block border border-gray-400" /></label>
            </p>
            <p>
                <label>Message: <textarea name="message" class="mb-6 block border border-gray-400"></textarea></label>
            </p>
            <p>
                <button type="submit" class="py-2 px-4 text-white bg-blue-600">Send</button>
            </p>
        </form>
      </Section>
    );
  };
  
  export default Form;