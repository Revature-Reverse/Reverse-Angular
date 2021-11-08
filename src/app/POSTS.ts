export default [
  {
    id: 1,
    title: 'Title 1',
    body:
      "<h3>How do I get Docker working?</h3><p>I can't seem to get Docker to run, any ideas?</p>",
    poster: {
      id: 1,
      userName: "timothyharper",
      firstName: "Timothy",
      lastName: "Harper"
    },
    comments:
      [
        {
          id: 1,
          post_id: 1,
          message: "test",
          commenter:
            {
              user_id: 2,
              userName: "paxtonplum",
              firstName: "Paxton",
              lastName: "Plum"
            },
          replies:
            [
              {
                replier:
                  {
                    id: 1,
                    post_id: 1,
                    message: "test reply",
                    created: new Date(),
                    user_id:5,
                    firstName: "Jerry",
                    lastName: "Zheng"
                  }
              }
            ]
        }
      ],
    created_at: new Date()
  },
  {
    id: 2,
    title: 'Title 2',
    body:
      "<h3>I'm not sure I see the advantage of Angular over AngularJS</h3><p>Is there any advantage? Angular" +
      ' seems like AngularJS with extra steps</p>',
    poster: {
      id: 4,
      userName: "sarahsmith",
      firstName: "Sarah",
      lastName: "Smith"
    },
    created_at: new Date()
  },
  {
    id: 3,
    title: 'Title 3',
    body:
      "<h3>Vue is objectively the best JavaScript framework</h3><p>It's like the best of both worlds between Angular" +
      ' and React</p>',
    poster: {
      id: 3,
      userName: "jerryzheng",
      firstName: "Jerry",
      lastName: "Zheng",
    },
    created_at: new Date()
  },
  {
    id: 4,
    title: 'Title 4',
    body:
      "<h3>My S3 key is not working.</h3><p>I've been having issues with my S3 setup. Any Ideas? I put the code below." +
      '<code>Some code here...</code></p>',
    poster: {
      id: 3,
      userName: "jerryzheng",
      firstName: "Jerry",
      lastName: "Zheng",
    },
    created_at: new Date()
  },
  {
    id: 5,
    title: 'Title 5',
    body:
      '<h3>Lorem ipsum.</h3><p>Mauris tortor eros, interdum at massa vitae, eleifend consequat justo. Donec ' +
      'malesuada quam vel auctor vestibulum. Phasellus viverra, velit a malesuada suscipit, odio dui venenatis dui, ac ' +
      'cursus purus nisi vel risus. Nullam convallis, dolor fringilla semper vulputate, massa nibh pellentesque orci, in ' +
      'luctus elit tortor ut justo. Sed ac velit malesuada dolor iaculis facilisis. Nunc eget vehicula dolor, id dignissim t' +
      'urpis. Etiam imperdiet vel risus sed rutrum. Donec ac viverra mi.</p>',
    poster: {
      user_id: 2,
      userName: "paxtonplum",
      firstName: "Paxton",
      lastName: "Plum"
    },
    created_at: new Date()
  }
];
