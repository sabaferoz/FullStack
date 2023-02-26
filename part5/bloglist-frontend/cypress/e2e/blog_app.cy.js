describe('Blog app', function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "test",
      username: "test",
      password: "test",
    };
    const user1 = {
      name: "test1",
      username: "test1",
      password: "test1",
    };
    
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.request("POST", "http://localhost:3001/api/users/", user1);
  
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
     cy.contains('username')
     cy.contains('password')
     cy.contains('login')
  })
    
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login').click()
        cy.contains('test logged in')
      
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('test2')
        cy.get('#password').type('test2')
        cy.get('#login').click()
        cy.contains('Wrong credentials')
      
    })
    
  })

   describe('When logged in', function() {
    beforeEach(function() {
         cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login').click()
        cy.get('#addNewBlog').click()
        cy.get('#title').type('test-title')
        cy.get('#url').type('http://google.com')
        cy.get('#addBlog').click()
    })

    it('A blog can be created', function() {
        cy.get('#addNewBlog').click()
        cy.get('#title').type('test-title1')
        cy.get('#url').type('http://google.com')
        cy.get('#addBlog').click()
        cy.contains("a new blog test-title1 by test")
    })

    it('A blog can be liked', function() {
        cy.get('#view').click()
        cy.get('#like').click()
        cy.contains("Likes: 1")
    })
    it('A blog can be deleted', function() {
        cy.get('#view').click()
        cy.get('#remove').click()
        cy.contains("Removed blog test-title by test")
    })



    
  })

describe('Only the user who creates the blog', function() {
        beforeEach(function() {
         cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login').click()
        cy.get('#addNewBlog').click()
        cy.get('#title').type('test-title')
        cy.get('#url').type('http://google.com')
        cy.get('#addBlog').click()
        cy.get('#logout').click()
    })
    it('can see the remove blog button', function() {
        cy.get('#username').type('test1')
        cy.get('#password').type('test1')
        cy.get('#login').click()
        cy.get('#view').click()
        cy.get('#remove').should('not.exist')
    })
})

describe('Only the user who creates the blog', function() {
        beforeEach(function() {
         cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login').click()
        cy.get('#addNewBlog').click()
        cy.get('#title').type('test-title')
        cy.get('#url').type('http://google.com')
        cy.get('#addBlog').click()
        cy.get('#logout').click()
        
    })
    it('can see the remove blog button', function() {
        cy.get('#username').type('test1')
        cy.get('#password').type('test1')
        cy.get('#login').click()
        cy.get('.view').eq(0).click()
        cy.get('#remove').should('not.exist')
    })
})

describe('The blog with the most likes is', function() {
        beforeEach(function() {
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.get('#login').click()
        cy.get('#addNewBlog').click()
        cy.get('#title').type('test-title')
        cy.get('#url').type('http://google.com')
        cy.get('#addBlog').click()
        cy.get('.view').eq(0).click()
        cy.get('.like').eq(0).click()
        cy.get('#addNewBlog').click()
        cy.get('#title').type('test-title1')
        cy.get('#url').type('http://google.com')
        cy.get('#addBlog').click()
        cy.get('.view').eq(1).click()
        cy.get('.like').eq(1).click()
        cy.get('.like').eq(1).click()
        cy.get('.like').eq(0).click()
        cy.get('.like').eq(0).click()
    })
    it('at the top', function() {
        cy.get('.blog').eq(0).should('contain', 'test-title1')
        cy.get('.blog').eq(1).should('contain', 'test-title')
    })
})
  })
