export const FlexContainer = ({ children, direction = 'row', justify = 'start', align = 'start', className = '', style = {} }) => (
  <Container
    className={`d-flex flex-${direction} justify-content-${justify} align-items-${align} ${className}`}
    style={style}
  >
    {children}
  </Container>
);

export const GridContainer = ({ children, className = '', style = {} }) => (
  <Container className={className} style={style}>
    <Row>
      {React.Children.map(children, (child, idx) => (
        <Col key={idx}>
          {child}
        </Col>
      ))}
    </Row>
  </Container>
);

You have detailed positioning and alignment options:

direction: row | column | row-reverse | column-reverse

justify (horizontal alignment):

start | end | center | between | around | evenly

align (vertical alignment):

start | end | center | baseline | stretch

<div className="d-flex flex-row justify-content-start align-items-start">
  {/* Insert your content here */}
</div>

Flex Direction (flex-direction):

flex-row (default horizontal layout)

flex-column (vertical layout)

flex-row-reverse

flex-column-reverse

Horizontal Alignment (justify-content):

justify-content-start (align left)

justify-content-center (align center horizontally)

justify-content-end (align right)

justify-content-between (items evenly distributed with space between)

justify-content-around (evenly spaced with space around)

justify-content-evenly (even spacing)

Vertical Alignment (align-items):

align-items-start (top alignment)

align-items-center (vertical center alignment)

align-items-end (bottom alignment)

align-items-baseline

align-items-stretch (default)


<div className="container">
  <div className="row">
    <div className="col-md-6">First half</div>
    <div className="col-md-6">Second half</div>
  </div>
</div>

<div 
  className="d-flex justify-content-center align-items-center"
  style={{ marginTop: '12px', marginLeft: '3px' }}
>
  Your precisely positioned content
</div>
