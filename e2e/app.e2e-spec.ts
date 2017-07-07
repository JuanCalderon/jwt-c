import { JwtCPage } from './app.po';

describe('jwt-c App', function() {
  let page: JwtCPage;

  beforeEach(() => {
    page = new JwtCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
