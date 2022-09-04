// button component test
describe('button component test', () => {
    it('should render button component', () => {
        cy.visit('/')
        cy.get('button').should('have.length', 1)
    });

    it('should render button component with text', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World')
    });

    it('should render button component with text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500')
    });

    it('should render button component with text and class and disabled', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled')
    });

    it('should render button component with text and class and disabled and click', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click()
    });

    it('should render button component with text and class and disabled and click and check text', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!')
    });

    it('should render button component with text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click()
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click()
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click()
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click()
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click()
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!')
    });

    it('should render button component with text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class and disabled and click and check text and class', () => {
        cy.visit('/')
        cy.get('button').contains('Hello World').should('have.class', 'bg-blue-500').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!').should('have.class', 'text-white').should('be.disabled').click().should('have.text', 'Hello World!')
    });
});