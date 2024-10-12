import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ComposableTestComponent } from './composable-test.component'

describe('ComposableTestComponent', () => {
  let component: ComposableTestComponent
  let fixture: ComponentFixture<ComposableTestComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposableTestComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ComposableTestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
