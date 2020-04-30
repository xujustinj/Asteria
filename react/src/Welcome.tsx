import React, { useState } from 'react';
import { Accordion, Icon, AccordionTitleProps } from 'semantic-ui-react';

const Welcome = () => {
    const [activeIndices, setActiveIndices] = useState([true, false, false, false]);

    const handleClick = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, props: AccordionTitleProps) => {
        const index: number = Number(props.index);
        console.log(activeIndices);
        let newIndices: boolean[] = [...activeIndices];
        newIndices[index] = !newIndices[index];
        console.log(newIndices)
        setActiveIndices(_activeIndices => newIndices);
    }

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndices[0]}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          What is Asteria?
        </Accordion.Title>
        <Accordion.Content active={activeIndices[0]}>
          <p>Asteria is the product of a ongoing adventure into the world of machine learning. The goal: to have a tool that can identify and translate <a href="https://madeon.fandom.com/wiki/Adventure_alphabet">Madeon's Adventure alphabet</a> on the fly (hence the name Asteria). By no means is Asteria anywhere near that goal, nor am I making a direct beeline for it. I'm taking a winding path that will hopefully maximize the amount I can learn from this project.</p>
          <p><b>Click "Asteria" in the top left corner to open the sidebar. There are 3 small-scale demonstrations of Asteria's learning power that probably won't melt your CPUs. Enjoy!</b></p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndices[1]}
          index={1}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Where has the adventure taken you so far?
        </Accordion.Title>
        <Accordion.Content active={activeIndices[1]}>
          <p>So far, I have:</p>
          <ul>
            <li>built an <b>object-oriented multilayer perceptron</b> library in <b>TypeScript</b></li>
            <li>implemented <b>symbolic differentiation</b> (deprecated)</li>
            <li>re-derived and implemented the matrix shortcuts for computing <b>backpropagation</b></li>
            <li>added <b>momentum</b> and <b>orthogonal initialization</b> to speed up learning</li>
            <li>built this website with <b>React</b> and <b>React Router</b></li>
            <li>re-learned <b>CSS</b> via <b>SASS (scss)</b></li>
            <li>attempted to make use of the still-unstable <b>Semantic UI React</b></li>
          </ul>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndices[2]}
          index={2}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Acknowledgements
        </Accordion.Title>
        <Accordion.Content active={activeIndices[2]}>
          <p>Special thanks to:</p>
          <ul>
            <li><b>Grant Sanderson (3Blue1Brown)</b> for making the <a href="https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi">videos</a> that kicked off this adventure</li>
            <li><b>TwoNineFive</b> for the putting together the <a href="https://fontmeme.com/fonts/madeon-runes-font/">lovely font</a> that's dotted around this site</li>
          </ul>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndices[3]}
          index={3}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          Why on Earth did you write the library in TypeScript?
        </Accordion.Title>
        <Accordion.Content active={activeIndices[3]}>
          <p>Why not? As long as I'm learning something new, the choice is justified.</p>
        </Accordion.Content>
      </Accordion>
    )
}

export default Welcome;
