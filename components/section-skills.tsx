import React, { memo } from 'react';
import Section from './section';
import SummaryItem from './summary-item';
import { Skill } from '../types';

interface SectionSkillsProps {
  skills: Skill[];
}

const SectionSkills: React.FC<SectionSkillsProps> = memo(({ skills }) => {
  return (
    <Section title="Skills">
      {skills.map((skill, index) => (
        <SummaryItem
          key={skill.id || index}
          name={skill.name}
          description={skill.description}
        />
      ))}
    </Section>
  );
});

SectionSkills.displayName = 'SectionSkills';

export default SectionSkills;
