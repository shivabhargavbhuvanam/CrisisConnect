// VolunteerData.tsx
// This file should have the volunteers array and the JSX for rendering the volunteers
function VolunteerData() {
    // assuming volunteers is an array in the scope of this component
    return (
      <section className="volunteer-section">
        {/* ... */}
      </section>
    );
  }
  
  export default VolunteerData;
  
  const volunteers = [
    {
      name: 'Jasmin Jaquline',
      role: 'Volunteer',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: '/path/to/jasmin-image.jpg',
      socials: [
        { type: 'facebook', link: 'https://facebook.com/jasmin' },
        { type: 'twitter', link: 'https://twitter.com/jasmin' },
        // Add other social media as needed
      ],
    },
    // ...other volunteers
  ];
  