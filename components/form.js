import React from 'react';
import Section from './section';

const Form = ({}) => {
    return (
      <Section title="Contact Me">
        <form name="contact" method="POST" encType="application/x-www-form-urlencoded" netlify-honeypot="bot-field" netlify="">
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
                <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
            </p>
            <p>
                <label>Name: <input type="text" name="name" className="mb-4 block border border-gray-400" /></label>
            </p>
            <p>
                <label>Email: <input type="text" name="email" className="mb-4 block border border-gray-400" /></label>
            </p>
            <p>
                <label>Message: <textarea name="message" className="mb-6 block border border-gray-400"></textarea></label>
            </p>
            <p>
                <button type="submit" className="py-2 px-4 text-white bg-blue-600">Send</button>
            </p>
        </form>
      </Section>
    );
  };
  
  export default Form;