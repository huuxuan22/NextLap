"""merge is_login and soft delete branches

Revision ID: 67f01b473dd2
Revises: a1dbb0149454, db420a48019a
Create Date: 2026-01-06 11:24:54.033932

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '67f01b473dd2'
down_revision: Union[str, Sequence[str], None] = ('a1dbb0149454', 'db420a48019a')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
