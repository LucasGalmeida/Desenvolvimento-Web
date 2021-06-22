import React, { useRef, useEffect } from 'react';

import ChannelMessage, { Mention } from '../ChannelMessage';

import { Container, Messages, InputWrapper, Input, InputIcon } from './styles';


const ChannelData: React.FC = () => {

    const messagesRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        const div = messagesRef.current;

        if (div) {
        div.scrollTop = div.scrollHeight;
        }
    }, [messagesRef]);

    return (
        <Container>
            
            <Messages ref={messagesRef}>
                {Array.from(Array(15).keys()).map((n) => (
                <ChannelMessage
                    key={n}
                    author="Abobrinha"
                    date="21/06/2020"
                    content="LeroLero!"
                />
                ))}

                <ChannelMessage
                    author="LucasGalmeida"
                    date="09/04/2021"
                    content="Hoje é meu aniversário!"
                />

                <ChannelMessage
                    author="QualquerOutraPessoa"
                    date="09/04/2021"
                    content={
                        <>
                            <Mention>@LucasGalmeida</Mention>, Me carrega no LoL pf
                        </>
                    }
                    hasMention
                    isBot
                />
            </Messages>
            
            <InputWrapper>
                <Input type="text" placeholder="Conversarem #chat-livre" />
                <InputIcon />
            </InputWrapper>

            
        </Container>
    )
};

export default ChannelData;