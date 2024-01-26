import React from 'react';
import {
  render,
  act,
  cleanup,
  waitFor,
  screen,
} from '@testing-library/react';
import StatusIcon, { STATUS_CODE } from '../StatusIcon';

// Mocking setTimeout and clearTimeout
jest.useFakeTimers();

describe('<StatusIcon />', () => {
  afterEach(cleanup);

  it('renders without crashing', () => {
    render(<StatusIcon />);
  });

  it('renders loading icon', () => {
    render(<StatusIcon status={STATUS_CODE.LOADING} />);
    expect(screen.getByRole('presentation')).toHaveClass('gyp-icon-inline-loading');
  });

  it('renders success icon', () => {
    render(<StatusIcon status={STATUS_CODE.SUCCESS} />);
    expect(screen.getByRole('presentation')).toHaveClass('gyp-icon-inline-success');
  });

  it('renders error icon', () => {
    render(<StatusIcon status={STATUS_CODE.ERROR} />);
    expect(screen.getByRole('presentation')).toHaveClass('gyp-icon-inline-error');
  });

  it('auto-hides success icon after 2 seconds', async () => {
    render(<StatusIcon status={STATUS_CODE.SUCCESS} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => expect(screen.queryByRole('presentation')).toBeNull());
  });

  it('does not auto-hide the success icon when autohide prop is false', () => {
    render(<StatusIcon status={STATUS_CODE.SUCCESS} autohide={false} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('clears timeout when status changes from SUCCESS to ERROR', () => {
    const { rerender } = render(<StatusIcon status={STATUS_CODE.SUCCESS} />);
    rerender(<StatusIcon status={STATUS_CODE.ERROR} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('clears timeout when status changes from SUCCESS to LOADING', () => {
    const { rerender } = render(<StatusIcon status={STATUS_CODE.SUCCESS} />);
    rerender(<StatusIcon status={STATUS_CODE.LOADING} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('show icon immediately when autohide is turned off', () => {
    const { rerender } = render(<StatusIcon status={STATUS_CODE.SUCCESS} />);
    rerender(<StatusIcon status={STATUS_CODE.SUCCESS} autohide={false} />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});
