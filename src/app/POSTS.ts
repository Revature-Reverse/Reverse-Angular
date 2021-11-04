export default [
  {
    id: 1,
    title: 'Title 1',
    content:
      "<h3>How do I get Docker working?</h3><p>I can't seem to get Docker to run, any ideas?</p>",
    user_id: 1,
    comments:
      [
        {
          id: 1,
          post_id: 1,
          message: "test",
          commentor:
            {
              user_id:2,
              firstName: "Paxton",
              lastName: "Plum"
            }
        }
      ]
  },
  {
    id: 2,
    title: 'Title 2',
    content:
      "<h3>I'm not sure I see the advantage of Angular over AngularJS</h3><p>Is there any advantage? Angular" +
      ' seems like AngularJS with extra steps</p>',
    user_id: 4,
  },
  {
    id: 3,
    title: 'Title 3',
    content:
      "<h3>Vue is objectively the best JavaScript framework</h3><p>It's like the best of both worlds between Angular" +
      ' and React</p>',
    user_id: 3,
  },
  {
    id: 4,
    title: 'Title 4',
    content:
      "<h3>My S3 key is not working.</h3><p>I've been having issues with my S3 setup. Any Ideas? I put the code below." +
      '<code>Some code here...</code></p>',
    user_id: 3,
  },
  {
    id: 5,
    title: 'Title 5',
    content:
      '<h3>Lorem ipsum.</h3><p>Mauris tortor eros, interdum at massa vitae, eleifend consequat justo. Donec ' +
      'malesuada quam vel auctor vestibulum. Phasellus viverra, velit a malesuada suscipit, odio dui venenatis dui, ac ' +
      'cursus purus nisi vel risus. Nullam convallis, dolor fringilla semper vulputate, massa nibh pellentesque orci, in ' +
      'luctus elit tortor ut justo. Sed ac velit malesuada dolor iaculis facilisis. Nunc eget vehicula dolor, id dignissim t' +
      'urpis. Etiam imperdiet vel risus sed rutrum. Donec ac viverra mi.</p>',
    user_id: 2,
  },
];
